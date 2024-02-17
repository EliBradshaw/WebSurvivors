export default class Utils {
    static clamp(number, min, max) {
        return Math.max(min, Math.min(max, number));
    }
}
