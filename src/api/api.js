
export const getComment = async () => {
    return [
        {
            id: "1",
            body: "First Comment",
            username: "Amit",
            userid: "1",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00"
        },
        {
            id: "2",
            body: "Second comment",
            username: "Sumit",
            userId: "2",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "3",
            body: "First comment first child",
            username: "Anup",
            userId: "2",
            parentId: "1",
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "4",
            body: "Second comment second child",
            username: "Rohit",
            userId: "2",
            parentId: "2",
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "5",
            body: "This is reply nested comment",
            username: "Soham",
            userId: "1",
            parentId: "3",
            createdAt: "2022-08-16T23:00:33.010+02:00"
        }
    ];
}

export const createComment = async (text, parentId = null) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId,
        userId: "1",
        username: "John",
        createdAt: new Date().toISOString(),
    };
}

export const updateComment = async (text) => {
    return { text };
}

export const deleteComment = async () => {
    return {};
}
