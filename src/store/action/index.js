import swal from 'sweetalert'
import firebase from '../../assets/config/firebase'
import Swal from 'sweetalert2'


const auth = firebase.auth()
const db = firebase.database()
// const storage = firebase.storage()   

const swalFunc = async (selectedPost, history) => {
    const SwalA = require('sweetalert2')

    const swalWithBootstrapButtons = SwalA.mixin({
        customClass: {
            confirmButton: 'btn btn-success confirm',
            cancelButton: 'btn btn-danger cancel'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't to Delete this Ad",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        imageUrl: selectedPost.adsImages[0],
        imageWidth: 'auto',
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('==========')
            // let snapData = false;
            db.ref(`users/${selectedPost.postOwner}/userAds`).on('value', (snap) => {
                const snapData = snap.val()
                for (let key in snapData) {
                    if (snapData[key] === selectedPost.postId) {
                        // console.log(snapData[key], key)
                        // if (snapData[key] === selectedPost.postId) {
                        db.ref(`users/${selectedPost.postOwner}/userAds/${[key]}`).remove().then(() => {
                            db.ref(`categories/${selectedPost.category}/${selectedPost.postId}`).remove()
                        })

                        // }
                    }
                }
            })

            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            ).then(() => {
                history.push('/olx-')


            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('===')

            //   swalWithBootstrapButtons.fire(
            //     'Cancelled',
            //     'Your imaginary file is safe :)',
            //     'error'
            //   )
        }
    })

}

const setLocalStorage = (val) => {
    if (!localStorage.hasOwnProperty('currentUserId')) {
        localStorage.setItem('currentUserId', val)
    }
    else {
        localStorage.setItem('currentUserId', val)
    }
}
const chatStart = (userId, postId, createChatid) => {
    db.ref(`chats/${createChatid}`).on('value', (snap => {
        let data = snap.val()
        if (data) {
            let d = {
                ...data,
                [postId]: postId
            }
            db.ref(`chats/${createChatid}`).set(d)
        }
        else {
            db.ref(`chats/${createChatid}`).set({ [postId]: postId })
        }
    }))
    db.ref(`users/${userId}`).on('value', (snap) => {
        let userData = snap.val()
        if (userData.chatsWith) {
            let ab = userData.chatsWith.[createChatid]
            let x = { ...ab, [postId]: postId }
            // console.log(x)
            db.ref(`users/${userId}/chatsWith/${createChatid}`).set(x)

        }
        else {
            db.ref(`users/${userId}/chatsWith/${createChatid}`).set({ [postId]: postId })

        }
    })

}
const checkAuth = () => {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            // return dispatch => {
            if (user) {
                const flag = localStorage.getItem('currentUserId') === user.uid
                // console.log('onAuthStateChange')

                dispatch({
                    type: 'check_auth',
                    isLogedIn: flag,
                    uid: user.uid,
                })


            }
            else {
                localStorage.setItem('currentUserId', '')

            }

            // }

        })

    }
}

const create_account = (data, history, pass) => {
    const { txtEmail} = data
    // const userData = {
    //     txtEmail,
    //     txtUserName,
    //     txtNumber,
    //     userId
    // }
    return dispatch => {
        // console.log('set_data ==>')
        auth.createUserWithEmailAndPassword(txtEmail, pass).then((snap) => {
            data.userId = snap.user.uid
            setLocalStorage(snap.user.uid)
            db.ref(`users`).child(data.userId).set(data).then(() => {
                // console.log('data set')
                dispatch({
                    type: 'create_account',
                    user: data
                })
                history.replace('/olx-')

            }).catch(e => console.log(e))
        }).catch(e => {
            swal({
                title: "Something wrong",
                text: e.message,
                icon: 'error',
                button: 'Ok'

            })
        })

    }
}
const sign_in = (data, history) => {
    const { txtEmail, txtPass } = data
    return dispatch => {
        auth.signInWithEmailAndPassword(txtEmail, txtPass).then((snap) => {
            console.log('login sucessfully', snap.user.uid)
            data.userId = snap.user.uid
            setLocalStorage(snap.user.uid)
            dispatch({
                type: 'sign_in',
                user: data
            })
            history.replace('/olx-')
        }).catch(e => {
            swal({
                title: "Something wrong",
                text: e.message,
                icon: 'error',
                button: 'Ok'
            })
        })

    }
}
const sign_out = (history) => {
    return (dispatch) => {
        console.log('sign out')
        auth.signOut().then(() => {

            dispatch({
                type: 'sign_out',
                payload: false
            })
            setLocalStorage('')
            // history.push('/olx-')
            history.push('/olx-')
            window.location.reload()
            console.log('ho gaya')
        })
    }
}
const create_post = (data, postProps) => {
    // const {selectedCategory} = data
    const postData = {
        category: data.selectedCategory[0],
        showNumber: data.showNumber,
        phone: data.phoneNumber,
        name: data.txtName,
        title: data.txtTitle,
        description: data.txtDescription,
        price: data.txtPrice,
        postUserName: data.txtReviewName,
        province: data.selectState,
        postOwner: postProps.userId,
        adsImages: []

    }
    return (dispatch) => {
        let myPromise = new Promise((resolve, reject) => {
            let checkImages = () => {
                if (postData.adsImages.length === data.imagesValues.length) {
                    // console.log(postData.adsImages.length, data.imagesValues.length)
                    resolve(postData.adsImages)
                }
                
            }
            for (let i = 0; i < data.imagesValues.length; i++) {
                firebase.storage().ref(`AdsPictures/${postProps.userId}/${data.imagesValues[i].name}`)
                    .put(data.imagesValues[i]).then((url) => {
                        url.ref.getDownloadURL()
                            .then((urlRef) => {
                                // console.log('Url', urlRef)
                                postData.adsImages = postData.adsImages.length > 0 ? [...postData.adsImages, urlRef] : [urlRef]
                                checkImages()
                            })
                    }).catch((e) => {
                        console.log(e.message)
                    })
            }
            
        })
        myPromise.then(() => {
            let postKey = db.ref(`categories`).child(`bikes`).push().key
            postData.postId = postKey
            db.ref(`categories/${data.selectedCategory[0]}/${postKey}`).set(postData)
                .then(() => {
                    let adId = postKey
                    let uData = postProps.userInfo
                    uData.userAds = uData.userAds ? [...uData.userAds, adId] : [adId]
                    db.ref(`users/${postProps.userId}`).set(uData).then(() => {
                        console.log('User Updated')
                        dispatch({
                            type: 'create_post',
                            payload: false
                        })

                        swal({
                            title: 'Post Ad Successfully',
                            icon: 'success',
                            button: 'Ok'
                        }).then(() => {
                            postProps.history.push('/olx-')
                        })
                    })
                }).catch((e) => {
                    console.log(e.message)
                })
        })
        // console.log('===>Data',data)
        // console.log('===>postProps',postProps)
    }
}
const get_userInfo = (uid) => {


    return (dispatch) => {
        // console.log(uid)
        db.ref(`users/${uid}`).on('value', (snap) => {
            let userData = snap.val()
            // console.log(userData)
            dispatch({
                type: 'get_user_info',
                payload: userData
            })
        })

    }
}
const get_post = () => {
    return (dispatch) => {
        let allPost = []
        db.ref(`/categories`).on('value', (snap) => {
            let posts = snap.val()
            for (let key in posts) {
                for (let a in posts[key]) {
                    // console.log(posts[key][a])
                    allPost.push(posts[key][a])
                }
            }
            dispatch({
                type: 'get_post',
                payload: allPost
            })
        })
    }
}
const get_category = () => {
    return (dispatch) => {
        db.ref(`/categories`).on('value', (snap) => {
            let posts = snap.val()
            console.log(posts)
            // dispatch({
            //     type: 'get_post',
            //     payload: allPost
            // })
        })
    }
}

const getProductKey = (props) => {
    return (dispatch) => {
        console.log(props)

        props.history.push('/olx-/product')
        dispatch({
            type: 'product_data',
            payload: props.data
        })
    }
}
const startChat = (props) => {
    let { userId, productId, history } = props
    let { postId, postOwner } = productId
    const createChatid = userId < postOwner ? userId + postOwner : postOwner + userId

    return (dispatch) => {
        // console.log(userId, postId, postOwner)
        chatStart(userId, postId, createChatid)
        history.push('/olx-/chat')
        dispatch({
            type: 'chat_data',
            payload: { productId, createChatid }
        })

    }
}
const getChatList = (props) => {
    return (dispatch) => {
        console.log('Get Chat List', props)
        // db.ref(`user`)
    }
}
const removeAd = (data, props) => {
    return (dispatch) => {

        swalFunc(data, props.history)


    }
}
const updateUserName = (uid, newName) => {
    return (dispatch) => {
        console.log('updateUserName', uid)
        db.ref(`users/${uid}/txtUserName`).set(newName)
    }
}

const changeUserPass = (currentPass, newPass) => {
    const SwalA = require('sweetalert2')
    const user = auth.currentUser;

    return (dispatch) => {
            user.updatePassword(newPass).then(()=> {
                SwalA.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: 'Password has been Changed',
                    showConfirmButton: false,
                    width:'100',
                    timer: 1300
                })
            }).catch(function (error) {
                // An error happened.
                SwalA.fire({
                    position: 'bottom-end',
                    text: 'Something wrong Password not changed',
                    showConfirmButton: false,
                    timer: 1300
                })
                console.log(error)
            });
        

        
    }
}

export {
    create_account,
    sign_in,
    sign_out,
    checkAuth,
    create_post,
    get_userInfo,
    get_post,
    getProductKey,
    startChat,
    getChatList,
    removeAd,
    get_category,
    updateUserName,
    changeUserPass
}