let btn = document.querySelectorAll('.song #play_btn');
let song = document.querySelectorAll('#music');

/*popup music player part*/
let p_m_player = document.querySelector('.popup_music_player');
let down_player = document.querySelector('#down_player');
let current_track_name = document.querySelector('#current_track_name');
let current_singer_name = document.querySelector('#current_singer_name');
let song_img = document.querySelector('.song_img');
let playing_img = document.querySelector('.playing_img');
let wave_animation = document.querySelector('.wave_animation');

/*controlls part*/
let play_pause_btn = document.querySelector('#play_pause_btn');
let slider = document.querySelector('#slider');
let forward_btn = document.querySelector('#forward_btn');
let backward_btn = document.querySelector('#backward_btn');
let replay_btn = document.querySelector('#replay_btn');
let random_btn = document.querySelector('#random_btn');

/*songs duration*/
let current_duration = document.querySelector('.controlls .progress_part #current_duration');
let total_duration = document.querySelector('.controlls .progress_part #total_duration');

/*volume duration*/
let volume_slider = document.querySelector('.controlls .volume_slider');
/*small music player part*/
let s_m_player = document.querySelector('.small_music_player');
let up_player = document.querySelector('#up_player');
let song_name = document.querySelector('#song_name');
let artist_name = document.querySelector('#artist_name');

/*default values*/
let is_song_played = false;
let song_status = false;
let index_no = 0;

btn.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        s_m_player.style.transform = 'translateY(0px)';
        if (index != index_no) {
            song_status = false;
        }

        index_no = index;
        song[index].currentTime = 0;

        if (song_status == false) {
            play_song();
        } else {
            pause_song();
        }
    });
});

/*pause song*/
function pause_song() {
    song[index_no].pause();
    song_status = false;
    clearInterval(update_second);
    wave_animation.style.opacity = '0';
    play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

/*This function will update every 1s*/
function update_second() {
    let position = 0;

    // update slider position
    if (!isNaN(song[index_no].duration)) {
        position = song[index_no].currentTime * (100 / song[index_no].duration);
        slider.value = position;
    }

    let durationMinutes = Math.floor(song[index_no].duration / 60);
    let durationSeconds = Math.floor(song[index_no].duration - durationMinutes * 60);
    total_duration.textContent = durationMinutes + ":" + durationSeconds;

    // Calculate the time left and the total duration
    let curr_minutes = Math.floor(song[index_no].currentTime / 60);
    let curr_seconds = Math.floor(song[index_no].currentTime - curr_minutes * 60);

    // Add a zero to the single digit time values
    if (curr_seconds < 10) { curr_seconds = "0" + curr_seconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }

    // Display the updated duration
    current_duration.textContent = curr_minutes + ":" + curr_seconds;

    // function will run when the song is over
    if (song[index_no].ended) {
        clearInterval(update_second);
        wave_animation.style.opacity = '0';
        play_pause_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';

        // Play the next song automatically
        index_no = (index_no + 1) % song.length;  // Loop back to the first song if it was the last one
        play_song();  // Play the next song
    }
}

/*show popup music player */
up_player.addEventListener('click', function() {
    p_m_player.style.transform = 'translateY(0%)';
});

/* Hide popup music player */
down_player.addEventListener('click', function() {
    p_m_player.style.transform = 'translateY(110%)';
});

/*play pause btn inside the popup Music player*/
play_pause_btn.addEventListener('click', function() {
    if (song_status == false) {
        song[index_no].play();
        song_status = true;
        wave_animation.style.opacity = '1';
        this.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    } else {
        song[index_no].pause();
        song_status = false;
        wave_animation.style.opacity = '0';
        this.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }
});

// change slider position 
function change_duration() {
    slider_position = song[index_no].duration * (slider.value / 100);
    song[index_no].currentTime = slider_position;
}

// change volume 
function setVolume() {
    song[index_no].volume = volume_slider.value / 100;
}

/*forward btn (next)*/
forward_btn.addEventListener('click', function() {
    index_no = index_no + 1;
    if (index_no == song.length) {
        index_no = 0;
    }
    song[index_no].currentTime = 0;
    play_song();
});

/*backward btn (previous)*/
backward_btn.addEventListener('click', function() {
    if (index_no == 0) {
        index_no = song.length - 1;
    } else {
        index_no = index_no - 1;
    }
    song[index_no].currentTime = 0;
    play_song();
});

/*replay current song*/
replay_btn.addEventListener('click', function() {
    song[index_no].currentTime = 0;  // Reset the song to the beginning
    song[index_no].play();  // Play the song immediately
    song_status = true;  // Update the song status to 'playing'
    wave_animation.style.opacity = '1';  // Show the wave animation
    play_pause_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';  // Change play/pause button icon to 'pause'
    setInterval(update_second, 1000);  // Start updating the progress
});

/*random btn (play random song)*/
random_btn.addEventListener('click', function() {
    let random_index = Math.floor(Math.random() * song.length);  // Generate a random index
    index_no = random_index;  // Set the current index to the random index
    song[index_no].currentTime = 0;  // Reset the current song time
    play_song();  // Play the selected song
});

/*play function*/
function play_song() {
    song[index_no].play();

    if (is_song_played == true) {
        document.querySelector(".active_song").pause();
        document.querySelector(".active_song").classList.remove("active_song");
    } else {
        is_song_played = true;
    }

    song[index_no].classList.add("active_song");
    song_status = true;
    setInterval(update_second, 1000);
    wave_animation.style.opacity = '1';
    p_m_player.style.transform = 'translateY(0%)';

    song_img.innerHTML = `<img src="${All_song[index_no].img}" />`;
    playing_img.innerHTML = `<img src="${All_song[index_no].img}" />`;

    song_name.innerHTML = All_song[index_no].name;
    artist_name.innerHTML = All_song[index_no].singer;

    current_track_name.innerHTML = All_song[index_no].name;
    current_singer_name.innerHTML = All_song[index_no].singer;
    play_pause_btn.innerHTML = '<i class="fa fa-pause pause" aria-hidden="true"></i>';
}
