// actions
export function setUser(user) {
    return {
        type: 'SET_USER',
        payload: {
            logged: true,
            spotifyId: user.spotifyId,
            userType: user.type,
            displayName: user.displayName,
            country: user.country
        }
    }
}

export function setSpotifyPlayer(player) {
    return {
        type: 'SET_PLAYER',
        payload: {
            spotifyPlayer: player
        }
    }
}

export function setDeviceId(id) {
    return {
        type: 'SET_DEVICE_ID',
        payload: {
            deviceId: id
        }
    }
}

export function setPlayerState(state) {
    return {
        type: 'SET_PLAYER_STATE',
        payload: {
            playerState: state
        }
    }
}

export function playPreviewSong(track) {
    return {
        type: 'PLAY_TRACK',
        payload: {
            uri: track.uri,
            artwork: track.artwork,
            trackTitle: track.trackTitle,
            trackArtist: track.trackArtist,
            duration: track.duration
        }
    }
}

export function playableSongs(songs) {
    return {
        type: 'PLAYABLE_SONGS',
        payload: {
            playableTracks: songs
        }
    }
}

export function closePlayer() {
    return {
        type: 'CLOSE_PLAYER'
    }
}

export function setSlidersValue(prevSliders, slider, value) {
    return {
        type: 'SET_SLIDERS',
        payload: {
            prevSliders: prevSliders,
            name: slider,
            value: value / 100
        }
    }
}

export function resetSlidersValue() {
    return {
        type: 'RESET_SLIDERS'
    }
}

export function setCheckedGenres(checked) {
    return {
        type: 'SET_CHECKED_GENRES',
        payload: {
            checkedGenres: checked
        }
    }
}

export function resetCheckedGenres() {
    return {
        type: 'RESET_CHECKED_GENRES',
        payload: {
            checkedGenres: null
        }
    }
}