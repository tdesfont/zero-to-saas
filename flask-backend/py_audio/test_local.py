import speech_recognition as sr
from pydub import AudioSegment

# Load the media file (3GP, MP4, etc.)
audio = AudioSegment.from_file('../my_audio_file.wav')  # or .3gp or other supported format
# Export it as WAV
audio.export("../converted_audio.wav", format="wav")

import whisper

model = whisper.load_model("turbo")
result = model.transcribe("../converted_audio.wav")
print(result["text"])
