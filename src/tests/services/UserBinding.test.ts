import { UserBindingGroup } from "@prisma/client"
import { prisma } from "../../database/prisma"
import { bindUserToTargetUser, getUserBindingData, getUsersBindingGroup, removeUserFromUserBindingGroup } from "../../service/UserBinding.service"

const addUserTestcases = [
    { userId: '1', targetUserId: '2', expected: { user: { isParent: true, parentUserId: '1' }, targetUser: { isParent: false, parentUserId: '1' }}},
    { userId: '1', targetUserId: '3', expected: { user: { isParent: true, parentUserId: '1' }, targetUser: { isParent: false, parentUserId: '1' }}},
    { userId: '2', targetUserId: '4', expected: { user: { isParent: false, parentUserId: '1' }, targetUser: { isParent: false, parentUserId: '1' }}},
    { userId: '5', targetUserId: '1', expected: { user: { isParent: false, parentUserId: '1' }, targetUser: { isParent: true, parentUserId: '1' }}},
    { userId: '5', targetUserId: '3', expected: { user: { isParent: false, parentUserId: '1' }, targetUser: { isParent: false, parentUserId: '1' }}},

    { userId: '11', targetUserId: '22', expected: { user: { isParent: true, parentUserId: '11' }, targetUser: { isParent: false, parentUserId: '11' }}},
    { userId: '22', targetUserId: '33', expected: { user: { isParent: false, parentUserId: '11' }, targetUser: { isParent: false, parentUserId: '11' }}},
    { userId: '33', targetUserId: '44', expected: { user: { isParent: false, parentUserId: '11' }, targetUser: { isParent: false, parentUserId: '11' }}},
]

beforeAll(async () => {
    await prisma.userBindingGroup.deleteMany()
})

afterAll(async () => {
    await prisma.userBindingGroup.deleteMany()
})

describe(('UserBindingSercvice'), () => {
    describe('Bind user to target user', () => {
        it.each(addUserTestcases)(`Bind user $userId to Target user $targetUserId`, async (testcase) => {

            const result = await bindUserToTargetUser(testcase.userId, testcase.targetUserId)

            expect(result.user?.isParent).toEqual(testcase.expected.user.isParent)
            expect(result.user?.parentUserId).toEqual(testcase.expected.user.parentUserId)
            expect(result.targetUser?.isParent).toEqual(testcase.expected.targetUser.isParent)
            expect(result.targetUser?.parentUserId).toEqual(testcase.expected.targetUser.parentUserId)
        })
        it('Merge tree 11 to 1', async () => {
            const result = await bindUserToTargetUser('3', '33')

            expect(result.user?.isParent).toEqual(false)
            expect(result.user?.parentUserId).toEqual('1')
            expect(result.targetUser?.isParent).toEqual(false)
            expect(result.targetUser?.parentUserId).toEqual('1')

            const currentParent = await getUserBindingData('1')
            const wasParent = await getUserBindingData('11')

            expect(currentParent?.isParent).toEqual(true)
            expect(wasParent?.isParent).toEqual(false)
        })
    })

    describe('Remove user from User Binding Group', () => {
        it('Remove user 2', async () => {
            await removeUserFromUserBindingGroup('2')
            const users = await getUsersBindingGroup('1')
            const userIds = users.map(user => user.userId)
            expect(userIds).not.toContain('2')
        })
        it('Remove user 1, ID 3 should be parent', async () => {
            await removeUserFromUserBindingGroup('1')
            const newParent = await getUserBindingData('3')
            expect(newParent?.isParent).toBe(true)
            const users = await getUsersBindingGroup('3')
            
            for (const user of users) {
                expect(user.parentUserId).toEqual('3')
            }
        })
        it('Remove whole tree', async () => {
            await bindUserToTargetUser('111', '222')
            await bindUserToTargetUser('111', '333')
    
            let user: UserBindingGroup | null;

            await removeUserFromUserBindingGroup('111')
            user = await getUserBindingData('111')
            expect(user).toBeNull()

            await removeUserFromUserBindingGroup('222')
            user = await getUserBindingData('222')
            expect(user).toBeNull()

            await removeUserFromUserBindingGroup('333')
            user = await getUserBindingData('333')
            expect(user).toBeNull()
    
        })
    })

    
})