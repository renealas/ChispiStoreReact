import User from '../../models/user';

export const SET_USERS = 'SET_USERS';

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        //any async code here!!!
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                'https://react-shop-b2016.firebaseio.com/users.json'
            );

            if (!response.ok) {
                throw new Error('Algo salio Mal!');
            }

            const resData = await response.json();
            const loadedUsers = [];

            for (const key in resData) {
                loadedUsers.push(
                    new User(
                        key,
                        resData[key].name,
                        resData[key].imageUrl,
                        resData[key].role
                    )
                );
            }

            dispatch({ type: SET_USERS, users: loadedUsers, userLogged: loadedUsers.filter(usr => usr.id === userId)});
        } catch (err) {
            throw err;
        }
    };
}