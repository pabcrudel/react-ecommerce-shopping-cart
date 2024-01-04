import dayjs from 'dayjs';

export function getWithTTL (key) {
  const value = localStorage.getItem(key);

  if (value) {
    const { content, expiry } = JSON.parse(value);
    const now = dayjs().unix();

    if (expiry && now > expiry) localStorage.removeItem(key);

    return content;
  }
}

export function setWithTTL (key, content) {
  const value = {
    content,
    expiry: dayjs().add(1, 'day').unix()
  };

  localStorage.setItem(key, JSON.stringify(value));
}
