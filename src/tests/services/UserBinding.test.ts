import { prisma } from "../../database/prisma"
import { bindUserToTargetUser, getUserBindingData } from "../../service/UserBinding.service"

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
})