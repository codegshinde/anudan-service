class Cookie {
  set(cookieName: string, cookieValue: string, expiresIn: string) {
    // Define time durations
    const timeDurations = [
      { expiresIn: 1 * 24 * 60 * 60, label: "1" },
      { expiresIn: 1 * 24 * 60 * 60 * 7, label: "7" },
      { expiresIn: 1 * 24 * 60 * 60 * 30, label: "30" },
      { expiresIn: Infinity, label: "infinite" },
    ];

    // Find expiration time based on label (e.g., '1', '7', '30', 'infinite')
    const expirationTime = timeDurations.find((item) => item.label === expiresIn);

    // Calculate expiration date
    const expirationDate = new Date(Date.now() + (expirationTime?.expiresIn || 1 * 24 * 60 * 60) * 1000).toUTCString();

    // Set the cookie
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate}; path=/`;
  }

  get(cookieName: string) {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");

      if (name === cookieName) {
        return value;
      }
    }

    return null;
  }

  remove(cookieName: string) {
    const pastExpirationDate = new Date(0).toUTCString();
    document.cookie = `${cookieName}=; expires=${pastExpirationDate}; path=/`;
  }
}

export default new Cookie();
