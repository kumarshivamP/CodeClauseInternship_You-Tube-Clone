import { API } from "../Config";

export const fetchVideos = (type) => {
    return fetch(`${API}/videos/${type}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        }

    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const fetchVideoById = (videoId) => {
    return fetch(`${API}/videos/find/${videoId}`, {
        method: "GET"
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const fetchChannel = (channelId) => {
    return fetch(`${API}/users/find/${channelId}`, {
        method: "GET"
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const UserSignIn = (email, password) => {
    return fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const GoogleSignIn = (name, email, img) => {
    return fetch(`${API}/auth/google`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, name: name, img: img })
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const videoLike = (videoId) => {
    return fetch(`${API}/users/like/${videoId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        }

    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const videoDislike = (videoId) => {
    return fetch(`${API}/users/dislike/${videoId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const channelSub = (channelId) => {
    return fetch(`${API}/users/sub/${channelId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}
export const channelUnsub = (channelId) => {
    return fetch(`${API}/users/unsub/${channelId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const fetchComments = (videoId) => {
    return fetch(`${API}/comments/${videoId}`, {
        method: "GET"
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const fetchVideosbyTag = async (tags) => {
    return fetch(`/videos/tags?tags=${tags}`, {
        method: "GET"
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });
};

export const fetchVideosbyQuery = async (query) => {
    return fetch(`/videos/search${query}`, {
        method: "GET"
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });
};

export const addComment = (desc, videoId) => {
    return fetch(`${API}/comments/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify({desc, videoId })
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}

export const addView = (videoId) => {
    return fetch(`${API}/videos/view/${videoId}`, {
        method: "PUT"
    })
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log("error", e);
        });

}