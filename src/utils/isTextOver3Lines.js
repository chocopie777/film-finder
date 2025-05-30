//проверка на то занимает ли текст более 3 строк, для того чтобы решать отображать ли кнопку "показать больше"
export default function isTextOver3Lines(element) {
  // Получаем высоту одной строки
  const lineHeight = parseInt(getComputedStyle(element).lineHeight);

  // Если lineHeight не задан, используем приблизительное значение (1.2em)
  const singleLineHeight = isNaN(lineHeight) ?
    parseInt(getComputedStyle(element).fontSize) * 1.2 : lineHeight;

  // Вычисляем ожидаемую высоту для 3 строк
  const threeLinesHeight = singleLineHeight * 3;

  // Получаем фактическую высоту элемента
  const actualHeight = element.clientHeight;

  // Проверяем, что фактическая высота более или равна 3 строкам
  return actualHeight >= threeLinesHeight;
}
