import React from 'react';
import { Audio } from 'expo-av';

const playButton = async () =>{
    var audio = null;
    const { sound } = await Audio.Sound.createAsync(
       require('../SoundEffect/ButtonPress.mp3')
    );
    audio = sound;
    audio.setVolumeAsync(0.1);
    await audio.playAsync(); 
}

const backButton = async () =>{
    var audio = null;
    const { sound } = await Audio.Sound.createAsync(
       require('../SoundEffect/BackButton.mp3')
    );
    audio = sound;
    audio.setVolumeAsync(0.1);
    await audio.playAsync(); 
}

export {playButton, backButton};