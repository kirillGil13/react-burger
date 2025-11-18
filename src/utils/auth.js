import { setAccessToken, setInitialUser, setUser, setUserError, setUserLoading } from '../services/user';
import { get, patch, post } from './request';

export const hasAuth = () => {
  return !!localStorage.getItem('refreshToken')
}

const updateToken = (dispatch, authData) => {
  const accessToken = authData.accessToken.split('Bearer ')[1];

  dispatch(setAccessToken(accessToken));
  localStorage.setItem('refreshToken', authData.refreshToken);

  return accessToken
}

export const fetchUser = (init) => {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true))
    dispatch(setUserError(null));
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      dispatch(setUserLoading(false))
      return null
    }

    const accessToken = getState().user.accessToken;

    try {
      let token = accessToken;

      if (!accessToken) {
        const authData = await post('/auth/token', { token: refreshToken }, init)
        
        token = updateToken(dispatch, authData)
      }

      const userData = await get('/auth/user', { headers: { Authorization: `Bearer ${token}` }, ...init });

      if (userData.status === 401) {
        const authData = await post('/auth/token', { token: refreshToken }, init)
        updateToken(dispatch, authData)

        return dispatch(fetchUser());
      }

      dispatch(setUser(userData.user));
      dispatch(setInitialUser(userData.user));

      return userData
    } catch (err) {
      dispatch(setUserError(err.message));
    } finally {
      dispatch(setUserLoading(false))
    }
  }
};

export const editUser = (form) => {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true))
    dispatch(setUserError(null));

    const accessToken = getState().user.accessToken;

    if (!accessToken) return
    
    try {
      const result = await patch('/auth/user', form, {headers: { Authorization: `Bearer ${accessToken}` }})

      dispatch(setUser(result.user));
    } catch (err) {
      dispatch(setUserError(err.message));
    } finally {
      dispatch(setUserLoading(false))
    }
  }
}

export const sendPasswordReset = async (email) => {
  return post('/password-reset', { email })
}

export const resetPassword = async (password, token) => {
  return post(`/password-reset/reset`, { password, token })
}

export const signIn = (form) => {
  return async dispatch => {
    try {
      const result = await post('/auth/login', form)

      dispatch(setUser(result.user));
      updateToken(dispatch, result)

      return result
    } catch (err) {
      throw err
    }
  }
}

export const signOut = () => {
  return async dispatch => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const result = await post('/auth/logout', {token: refreshToken})

      dispatch(setAccessToken(null));
      localStorage.removeItem('refreshToken');

      return result
    } catch (err) {
      throw err
    }
  }
}

export const registerUser = (form) => {
  return async dispatch => {
    try {
      const result = await post('/auth/register', form)

      dispatch(setUser(result.user));
      updateToken(dispatch, result)

      return result
    } catch (err) {
      throw err
    } 
  }
}
