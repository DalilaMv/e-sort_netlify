export const toCurrency = (value, fromProps = false) => {
  if (!value) {
    return '0,00';
  }

  let rawValue = value;
  if (fromProps) {
    try {
      rawValue = parseFloat(rawValue.toString()).toFixed(2);
    } catch (e) {
      rawValue = value.toString();
    }
  }

  const digits = rawValue.toString().replace(/\D/g, '');
  if (!digits) {
    return '0,00';
  }

  const v = `${(parseInt(digits, 10) / 100).toFixed(2)}`.split('.');
  const m = v[0]
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g);

  if (!m) {
    return '0,00';
  }

  for (let i = 0; i < m.length; i += 1) {
    m[i] = `${m[i].split('').reverse().join('')}.`;
  }

  const r = m.reverse().join('');

  return `${r.substring(0, r.lastIndexOf('.'))},${v[1]}`;
};

export const unmask = (value) => {
  return value
    .replace(/[^0-9,.]/g, '')
    .replace(/[.]/g, '')
    .replace(',', '.');
};
