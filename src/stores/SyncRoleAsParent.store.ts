class SyncRoleAsParentStore {
    
    protected redundantTaskIds: string[]

    constructor() {
        this.redundantTaskIds = []
    }

    private createTaskId(guildId: string, userId: string, parentId: string) {
        return `${guildId}-${userId}-${parentId}`
    }

    public addRedundantTask(guildId: string, userId: string, parentId: string) {
        this.redundantTaskIds.push(this.createTaskId(guildId, userId, parentId))
    }

    public removeRedundantTask(guildId: string, userId: string, parentId: string) {
        const taskId = this.createTaskId(guildId, userId, parentId)
        this.redundantTaskIds = this.redundantTaskIds.filter((id) => id !== taskId)
    }

    public isRedundantTask(guildId: string, userId: string, parentId: string) {
        return this.redundantTaskIds.includes(this.createTaskId(guildId, userId, parentId))
    }

}

export const store = new SyncRoleAsParentStore()