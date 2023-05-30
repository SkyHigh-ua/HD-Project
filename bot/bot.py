import telebot
import requests
import json

bot = telebot.TeleBot("6228697514:AAF0ag8MnIyfM7m-BdZ1rLzuoCK8sgYx5ds")

user_data = {}
url = ""

# Обробник команди /start
@bot.message_handler(commands=['start'])
def start_handler(message):
    bot.send_message(message.chat.id, "Вітаю, напишіть тему вашої проблеми.")

# Обробник текстових повідомлень
@bot.message_handler(func=lambda message: True)
def handle_text(message):
    chat_id = message.chat.id

    # Отримуємо тимчасові дані користувача
    if chat_id not in user_data:
        user_data[chat_id] = {}

    if 'topic' not in user_data[chat_id]:
        # Зберігаємо тему проблеми
        user_data[chat_id]['topic'] = message.text
        bot.send_message(chat_id, "Дякую, тепер розпишіть вашу проблему і вона буде відправлена на розгляд.")
    else:
        # Отримуємо текст проблеми
        topic = user_data[chat_id]['topic']
        text = message.text

        # Формуємо структуру запиту
        data = {
            "title": topic,
            "from": f"@{message.from_user.username}",
            "text": text,
        }

        bot.send_message(chat_id, "Запит відправлено успішно!")
        # Відправляємо запит на сервер
        #requests.post(url, json=json.dumps(data))
        #
        # # Обробка відповіді сервера
        # if response.status_code == 200:
        #     bot.send_message(chat_id, "Запит відправлено успішно!")
        # else:
        #     bot.send_message(chat_id, "Помилка при відправленні запиту.")

        # Очищаємо тимчасові дані користувача
        del user_data[chat_id]['topic']

# Запуск бота
bot.polling()