kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    green = 165
    blue = 0
    while (green < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
        basic.pause(50)
        green += 1
    }
    while (blue < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
        basic.pause(50)
        blue += 1
    }
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    alarmRunning = false
})
input.onButtonPressed(Button.A, function () {
    if (setTimeMode == true) {
        minutes += 1
    } else if (setAlarmMode == true) {
        alarmMinutes += 1
    } else {
        silenceAlarm = true
    }
})
input.onButtonPressed(Button.AB, function () {
    if (setTimeMode == true || setAlarmMode == true) {
        enterTime = true
    } else {
        setTimeMode = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (setTimeMode == true) {
        minutes += 10
    } else if (setAlarmMode == true) {
        alarmMinutes += 10
    } else {
        setAlarmMode = true
    }
})
let alarmHours = 0
let hours = 0
let silenceAlarm = false
let alarmMinutes = 0
let minutes = 0
let blue = 0
let green = 0
let wakeUpBrightness = 0
let alarmRunning = false
let setAlarmMode = false
let enterTime = false
let setTimeMode = false
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.setBuzzerPin()
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
setTimeMode = false
enterTime = false
setAlarmMode = false
alarmRunning = false
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (hours >= 12) {
            hours += -12
        }
        while (enterTime == false) {
            if (minutes > 59) {
                minutes = 0
                hours += 1
                if (hours == 12) {
                    hours = 0
                }
            }
            haloDisplay.clear()
            haloDisplay.setZipLedColor(minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(hours * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
            basic.pause(1)
        }
        kitronik_halo_hd.setTime(hours, minutes, 0)
        enterTime = false
        setTimeMode = false
    } else if (setAlarmMode == true) {
        alarmMinutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        alarmHours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (alarmHours >= 12) {
            alarmHours += -12
        }
        while (enterTime == false) {
            if (alarmMinutes > 59) {
                alarmMinutes = 0
                alarmHours += 1
                if (alarmHours == 12) {
                    alarmHours = 0
                }
            }
            haloDisplay.clear()
            haloDisplay.setZipLedColor(alarmMinutes, kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(alarmHours * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
            basic.pause(1)
        }
        kitronik_halo_hd.simpleAlarmSet(kitronik_halo_hd.AlarmType.Repeating, alarmHours, alarmMinutes, kitronik_halo_hd.AlarmSilence.autoSilence)
        silenceAlarm = false
        enterTime = false
        setAlarmMode = false
        wakeUpBrightness = 0
    } else {
        if (alarmRunning == false) {
            haloDisplay.clear()
            haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
            haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
        }
    }
})
