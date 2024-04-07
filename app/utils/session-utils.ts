const NAME_SPACE = 'LINK_FACTORY_SESSION.';

export class LFSession {
  static get(key: string) {
    try {
      const k = `${NAME_SPACE}${key}`;
      const d = sessionStorage.getItem(k);
      return d ? JSON.parse(d) : d;
    } catch (err) {
      return null;
    }
  }

  static set(key: string, val: any) {
    try {
      const k = `${NAME_SPACE}${key}`;
      sessionStorage.setItem(k, JSON.stringify(val) || 'null');
    } catch (err) {
      console.error(err);
    }
  }

  static remove(key: string) {
    try {
      const k = `${NAME_SPACE}${key}`;
      sessionStorage.removeItem(k);
    } catch (err) {
      console.error(err);
    }
  }

  static clear() {
    try {
      sessionStorage.clear();
    } catch (err) {
      console.error(err);
    }
  }
}
