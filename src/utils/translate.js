import translate from 'node-google-translate-skidz';

async function translateText({ text, source = 'en', target = 'es' }) {
  if (text === '') {
    return text;
  }

  try {
    const result = await new Promise((resolve, reject) => {
      translate({ text, source, target }, (result) => {
        if (result && result.translation) {
          resolve(result.translation);
        } else {
          reject('Error en la traducción');
        }
      });
    });

    return result;
  } catch (error) {
    console.error('Error al traducir:', error);
    return text;
  }
}

export async function translateObjects(objects) {
  const promises = objects.map(async (object) => {
    const { title, culture, dynasty, objectDate } = object;

    const translatedTitle = await translateText({ text: title });
    const translatedCulture = await translateText({ text: culture });
    const translatedDynasty = await translateText({ text: dynasty });
    const translatedObjectDate = await translateText({ text: objectDate });

    return {
      ...object,
      title: translatedTitle,
      culture: translatedCulture,
      dynasty: translatedDynasty,
      objectDate: translatedObjectDate,
    };
  });

  return Promise.all(promises);
}
