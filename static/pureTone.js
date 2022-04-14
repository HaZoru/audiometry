audioCtx = new AudioContext();

function dBFSToGain(dbfs) {
    return Math.pow(10, dbfs / 20);
}

function gainTodBFS(gain) {
    return 20 * Math.log10(gain);
}

class PureTone {
    constructor(frequency, initGain) {
        this.osc = audioCtx.createOscillator();
        this.osc.frequency.value = frequency;
        this.gain = audioCtx.createGain();
        this.initGain = initGain;
        this.gain.gain.setValueAtTime(dBFSToGain(initGain), 0);
        // connect nodes
        this.gain.connect(audioCtx.destination);
        this.osc.connect(this.gain);
    }

    play() {
        this.osc.start();
        return this
    }

    stop() {
        this.osc.stop(audioCtx.currentTime);
        return this
    }

    pulse() {
        this.gain.gain.exponentialRampToValueAtTime(dBFSToGain(this.initGain), audioCtx.currentTime + 2)
        this.gain.gain.exponentialRampToValueAtTime(dBFSToGain(-90), audioCtx.currentTime + 5)
        this.timeoutId = setTimeout(() => {
            this.pulse();
        }, 5000)
    }

    clearPulse() {
        clearTimeout(this.timeoutId);
        this.gain.gain.cancelAndHoldAtTime(audioCtx.currentTime);
        this.gain.gain.value = dBFSToGain(-100);
        return this

    }

    disconnect() {
        this.osc.disconnect(this.gain);
        this.gain.disconnect(audioCtx.destination);
    }

    reconnect() {
        this.osc.connect(this.gain);
        this.gain.connect(audioCtx.destination);
    }
}
