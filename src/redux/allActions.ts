import { openLoadingModal, closeLoadingModal } from './slice/modal';
import { openToast, closeToast } from './slice/toast';
import { setAuthUser, removeAuthUser } from './slice/authUser';
import { setCategory } from './slice/categorySlice';

export default {
  openLoadingModal,
  closeLoadingModal,

  openToast,
  closeToast,

  setAuthUser,
  removeAuthUser,
  setCategory,
};
