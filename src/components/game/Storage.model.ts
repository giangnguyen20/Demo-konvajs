export abstract class SessionStorage {
    sessionIdQueueKey: string;
    limitStorageSessionLength = 10;
  
    constructor(key: string) {
      this.sessionIdQueueKey = key;
    }
  
    initSession() {
      const now = new Date();
      const session = {
        id: now.getTime(),
        createdTime: now,
        steps: [],
      }
      localStorage.setItem(now.getTime().toString(), JSON.stringify(session));
      this.cleanUpStorage(session.id);
  
      return session.id;
    }
  
    cleanUpStorage(sessionId: number) {
      const existsSessionIds = localStorage.getItem(this.sessionIdQueueKey);
      let sessionIds = [];
      if (existsSessionIds) {
        sessionIds = JSON.parse(existsSessionIds);
      }
  
      if (sessionIds.length + 1 > this.limitStorageSessionLength) {
        const removeSessionId = sessionIds[0];
        sessionIds.shift();
        localStorage.removeItem(removeSessionId);
      }
  
      sessionIds.push(sessionId);
      localStorage.setItem(this.sessionIdQueueKey, JSON.stringify(sessionIds));
    }
  
    updateLocalStorage<T>(sessionId: string | undefined, newSteps: T) {
      if (!sessionId) {
        return;
      }
  
      const sessionData = localStorage.getItem(sessionId);
      if (sessionData) {
        let data = JSON.parse(sessionData);
        data.steps = newSteps;
        localStorage.setItem(sessionId, JSON.stringify(data));
      }
    }
  
    clearStorage() {
      const existsSessionIds = localStorage.getItem(this.sessionIdQueueKey);
      if (!existsSessionIds) {
        return false;
      }
  
      let sessionIds = JSON.parse(existsSessionIds) as number[];
      sessionIds.forEach(sessionId => {
        localStorage.removeItem(sessionId.toString());
      });
      localStorage.setItem(this.sessionIdQueueKey, JSON.stringify([]));
    }
  }
  