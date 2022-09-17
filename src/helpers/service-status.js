export function getColorByStatus(status) {
  let classColor = "text-gray-400";
  switch (status) {
    case "aberto":
      classColor = "text-green-400";
      break;
    case "pendente":
      classColor = "text-yellow-400";
      break;
    default:
      classColor = "text-gray-400";
      break;
  }

  return classColor;
}
