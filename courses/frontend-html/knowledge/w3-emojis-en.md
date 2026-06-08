# HTML Emojis

Source: https://www.w3schools.com/html/html_emojis.asp

Using Emojis in HTML
❮ Previous
Next ❯
What are Emojis?
Emojis look like images, but they are not.
Emojis are letters (characters) from the UTF-8 (Unicode) character set:
😄 😍 💗
UTF-8 covers almost all of the characters and symbols in the world.
Emoji
Value
&#128507;
Try it »
&#128508;
Try it »
&#128509;
Try it »
&#128510;
Try it »
&#128511;
Try it »
&#128512;
Try it »
&#128513;
Try it »
&#128514;
Try it »
&#128515;
Try it »
&#128516;
Try it »
&#128517;
Try it »
HTML Emojis Examples
Smileys
😀 😂 😊 😎 😜
Hands
✌ ✊ ☝ ✋ 👌
People
👮 🧕 👦 💏 🤴
Office
📈 💻 📌 📆 📒
Places
⛺ 🌋 🗽 🗿 🏢
Transport
🚈 🚗 🚢 🚌 🚀
Animals
🐴 🐕 🐘 🐻 🐞
Food
☕ 🌭 🍞 🍩 🍣
Plants
🌴 🌳 🌼 🍁 🥑
Fruits
🍇 🍊 🍏 🥝 🥥
Sports
⚽ 🏆 🤿 🏋 ⛳
Earth & Sky
🌐 🌍 🌖 🌟 🌞
Weather
⛅ ☔ 🌈 🌂 ⛄
Clothing
👚 👕 🎩 👜 👠
Audio/Video
🎥 🎵 🎹 🔊 📺
Celebration
🎁 🎃 🎈 🎓 🎂
Entertainment
🎨 🎪 🎭 🎡 🎢
Symbols
💡 💰 🔐 🔞 🔔
Learn More:
Full HTML Emoji Reference
The HTML charset Attribute
To display an HTML page correctly, a web browser must know the character set used in the page.
This is specified in the
<meta>
tag:
<meta charset="UTF-8">
If not specified, UTF-8 is the default character set in HTML.
UTF-8 Characters
Many UTF-8 characters cannot be typed on a keyboard,
but they can always be displayed using numbers (called entity numbers):
A is 65
B is 66
C is 67
Example
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<body>
<p>I will display A B C</p>
<p>I will display &#65; &#66; &#67;</p>
</body>
</html>
Try it Yourself »
Example Explained
<meta charset="UTF-8">
element defines the character set.
The characters A, B, and C, are displayed by the numbers 65, 66, and 67.
To let the browser understand that you are displaying a character, you must start the entity number
with &# and end it with ; (semicolon).
Emoji Characters
Emojis are also characters from the UTF-8 alphabet:
😄 is 128516
😍 is 128525
💗 is 128151
Example
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<body>
<h1>My First Emoji</h1>
<p>&#128512;</p>
</body>
</html>
Try it Yourself »
Since Emojis are characters, they can be copied, displayed,
and sized just like any other character in HTML.
Example
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<body>
<h1>Sized Emojis</h1>
<p style="font-size:48px">
&#128512; &#128516; &#128525; &#128151;
</p>
</body>
</html>
Try it Yourself »
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS
