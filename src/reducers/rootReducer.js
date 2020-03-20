const initState = {
    logged: false,
    showPlayer: false,
    sliders: {
        acousticness: 0.5,
        danceability: 0.5,
        energy: 0.5,
        instrumentalness: 0.5,
        liveness: 0.5,
        speechiness: 0.5,
        valence: 0.5
    }
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                logged: action.payload.logged,
                spotifyId: action.payload.spotifyId,
                userType: action.payload.userType,
                displayName: action.payload.displayName,
                country: action.payload.country
            }
        case 'SET_PLAYER':
            return {
                ...state,
                player: action.payload.spotifyPlayer
            }
        case 'SET_PLAYER_STATE':
            return {
                ...state,
                playerState: action.payload.playerState
            }
        case 'SET_DEVICE_ID':
            return {
                ...state,
                deviceId: action.payload.deviceId
            }
        case 'LOGOUT':
            return {
                logged: false,
                showPlayer: false
            }
        case 'PLAY_TRACK':
            return {
                ...state,
                showPlayer: true,
                uri: action.payload.uri,
                artwork: action.payload.artwork,
                trackTitle: action.payload.trackTitle,
                trackArtist: action.payload.trackArtist,
                duration: action.payload.duration

            }
        case 'PLAYABLE_SONGS':
            return {
                ...state,
                playableTracks: action.payload.playableTracks
            }
        case 'CLOSE_PLAYER':
            return {
                ...state,
                showPlayer: false
            }
        case 'SET_SLIDERS':
            return {
                ...state,
                sliders: {
                    ...action.payload.prevSliders,
                    [action.payload.name]: action.payload.value
                }
            }
        case 'RESET_SLIDERS':
            let resetSliders = {
                acousticness: 0.5,
                danceability: 0.5,
                energy: 0.5,
                instrumentalness: 0.5,
                liveness: 0.5,
                speechiness: 0.5,
                valence: 0.5
            }
            return {
                ...state,
                sliders: resetSliders
            }
        case 'SET_CHECKED_GENRES':
            return {
                ...state,
                checkedGenres: action.payload.checkedGenres
            }
        case 'RSET_CHECKED_GENRES':
            return {
                ...state,
                checkedGenres: action.payload.checkedGenres
            }
        default:
            return state;
    }
}

export default rootReducer;