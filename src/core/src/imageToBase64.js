export function imageToBase64 (image) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()

    fr.addEventListener('load', () => {
      resolve(fr.result)
    })

    fr.readAsDataURL(image)
  })
}
