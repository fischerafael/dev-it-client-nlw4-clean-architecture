export function formatTimeInSeconds(timeInSeconds: number) {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60

    const minuteFormated =
        String(minutes).length === 2 ? String(minutes) : `0${minutes}`
    const secondFormated =
        String(seconds).length === 2 ? String(seconds) : `0${seconds}`

    const formatedTimeString = minuteFormated + secondFormated
    const formatedTimeArray = formatedTimeString.split('')

    return {
        firstNumber: formatedTimeArray[0],
        secondNumber: formatedTimeArray[1],
        thirdNumber: formatedTimeArray[2],
        fourthNumber: formatedTimeArray[3]
    }
}
