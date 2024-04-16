import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class TextToSpeechService {
  private synth!: SpeechSynthesis;
  public voices: Array<SpeechSynthesisVoice>;
  public selectedVoices: SpeechSynthesisUtterance;

  constructor(private alert: AlertController, private window: Window) {}

  public async init() {
    if ("speechSynthesis" in this.window) {
      this.synth = this.window.speechSynthesis;
    } else {
      const alert = await this.alert.create({
        header: "Sorry",
        message: "All ok",
        buttons: ["ok"],
      });
      await alert.present();
    }
  }

  public generateVoices(): Array<SpeechSynthesisVoice> {
    this.voices = this.synth.getVoices().sort((a: any, b: any) => {
      const aName = a.name.toUpperCase();
      const bName = b.name.toUpperCase();

      if (aName < bName) {
        return -1;
      } else if (aName == bName) {
        return 0;
      } else {
        return +1;
      }
    });

    return this.voices;
  }

  public grabVoice(voice: string): SpeechSynthesisVoice {
    let selectedVoice!: SpeechSynthesisVoice;
    for (let i = 0; i < this.voices.length; i++) {
      if (this.voices[i].name === voice) {
        selectedVoice = this.voices[i];
        break;
      }
    }
    return selectedVoice;
  }

  public speak(
    selectedText: string,
    selectedVoice: string,
    selectedPitch: number,
    selectedRate: number,
    selectedVolume: number
  ): void {
    // Set speech synthesis properties for playback
    this.selectedVoices = new SpeechSynthesisUtterance(selectedText);
    this.selectedVoices.voice = this.grabVoice(selectedVoice);
    this.selectedVoices.rate = selectedRate;
    this.selectedVoices.pitch = selectedPitch;
    this.selectedVoices.volume = selectedVolume;

    // Event listeners for managing selected speech events
    this.manageEndOfSpeech();
    this.manageErrorWithSpeech();

    // Speak out!
    this.synth.speak(this.selectedVoices);
  }

  private manageEndOfSpeech(): void {
    this.selectedVoices.onend = (event: SpeechSynthesisEvent) => {
      console.log("speech has ended", event);
    };
  }

  private manageErrorWithSpeech(): void {
    this.selectedVoices.onerror = (event: SpeechSynthesisEvent) => {
      console.log("speech encountered an error ended", event);
    };
  }

  public stop(): void {
    this.synth.cancel();
  }
}
