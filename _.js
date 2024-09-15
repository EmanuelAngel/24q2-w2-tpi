import translate from 'node-google-translate-skidz';

export async function translateText({ text, source = 'en', target = 'es' }) {
  try {
    const result = await new Promise((resolve, reject) => {
      translate({ text, source, target }, (result) => {
        result && result.translation
          ? resolve(result.translation)
          : reject('Error en la traducción');
      });
    });

    return result;
  } catch (error) {
    console.error('Error al traducir:', error);
  }
}

(async () => {
  const text = await translateText({ text: 'Two cent dollar coin' });
  console.log(text); // "Moneda de dos céntimos de dólar"
})();
