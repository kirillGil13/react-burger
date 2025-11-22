import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { setAccessToken, setInitialUser, setUser, setUserError, setUserLoading } from '../services/user';
import { IAuthData, IChangeUserForm, IRegisterForm, IResetPasswordForm, ISignInForm } from '../types';
import { handleError } from './handleError';
import { authApi } from '../api';

export const hasAuth = () => {
  return !!localStorage.getItem('refreshToken')
}

const updateToken = (dispatch: ThunkDispatch<unknown, unknown, any>, authData: IAuthData) => {
  const accessToken = authData.accessToken.split('Bearer ')[1];

  dispatch(setAccessToken(accessToken));
  localStorage.setItem('refreshToken', authData.refreshToken);

  return accessToken
}

export const fetchUser = (init: RequestInit): ThunkAction<Promise<boolean | undefined>, any, unknown, any> => {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true))
    dispatch(setUserError(null));
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      dispatch(setUserLoading(false))
      return false
    }

    const accessToken = getState().user.accessToken;

    try {
      let token = accessToken;

      if (!accessToken) {
        const authData = await authApi.getAuthData(refreshToken, init)
        
        token = updateToken(dispatch, authData)
      }

      const userData = await authApi.getUser(token, init)

      if (userData.status === 401) {
        const authData = await authApi.getAuthData(refreshToken, init)
        updateToken(dispatch, authData)

        // TODO
        // @ts-ignore
        return dispatch(fetchUser());
      }

      dispatch(setUser(userData.user));
      dispatch(setInitialUser(userData.user));

      return userData.success
    } catch (err) {
      const error = handleError(err);
      dispatch(setUserError(error));
    } finally {
      dispatch(setUserLoading(false))
    }
  }
};

export const editUser = (form: IChangeUserForm): ThunkAction<Promise<void>, any, unknown, any> => {
  return async (dispatch, getState) => {
    dispatch(setUserLoading(true))
    dispatch(setUserError(null));

    const accessToken = getState().user.accessToken;

    if (!accessToken) return
    
    try {
      const result = await authApi.changeUser(form, accessToken)

      dispatch(setUser(result.user));
    } catch (err) {
      const error = handleError(err);
      dispatch(setUserError(error));
    } finally {
      dispatch(setUserLoading(false))
    }
  }
}

export const sendPasswordReset = async (email: string): Promise<boolean> => {
  try {
    const result = await authApi.sendResetPassword(email)

    return result.success
  } catch (err) {
    throw err
  }
}

export const resetPassword = async (form: IResetPasswordForm): Promise<boolean> => {
  try {
    const result = await authApi.resetPassword(form)

    return result.success
  } catch (err) {
    throw err
  }
}

export const signIn = (form: ISignInForm): ThunkAction<Promise<boolean>, any, unknown, any> => {
  return async dispatch => {
    try {
      const result = await authApi.signIn(form)

      dispatch(setUser(result.user));
      updateToken(dispatch, result)

      return result.success
    } catch (err) {
      throw err
    }
  }
}

export const signOut = (): ThunkAction<Promise<boolean>, any, unknown, any> => {
  return async dispatch => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false

    try {
      const result = await authApi.logOut(refreshToken)

      dispatch(setAccessToken(null));
      localStorage.removeItem('refreshToken');

      return result.success
    } catch (err) {
      throw err
    }
  }
}

export const registerUser = (form: IRegisterForm): ThunkAction<Promise<boolean>, any, unknown, any> => {
  return async dispatch => {
    try {
      const result = await authApi.registerUser(form)

      dispatch(setUser(result.user));
      updateToken(dispatch, result)

      return result.success
    } catch (err) {
      throw err
    } 
  }
}
