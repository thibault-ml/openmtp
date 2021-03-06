'use strict';

import path from 'path';
import { actionTypes } from './actions';
import { PATHS } from '../../utils/paths';
import {
  DEVICES_DEFAULT_PATH,
  DEVICES_TYPE_CONST,
  FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE
} from '../../constants';

export const initialState = {
  focussedFileExplorerDeviceType: {
    accelerator: FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE,
    onClick: FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE,
    value: FILE_EXPLORER_DEFAULT_FOCUSSED_DEVICE_TYPE
  },

  sidebarFavouriteList: {
    top: [
      {
        label: 'Home',
        path: PATHS.homeDir,
        icon: 'folder',
        enabled: true
      },
      {
        label: 'Desktop',
        path: path.join(PATHS.homeDir, `/Desktop`),
        icon: 'folder',
        enabled: true
      },
      {
        label: 'Downloads',
        path: path.join(PATHS.homeDir, `/Downloads`),
        icon: 'folder',
        enabled: true
      },
      {
        label: 'Removable Disks',
        path: '/Volumes',
        icon: 'folder',
        enabled: true
      },
      {
        label: 'Root',
        path: '/',
        icon: 'folder',
        enabled: true
      }
    ],
    bottom: []
  },

  toolbarList: {
    [DEVICES_TYPE_CONST.local]: {
      up: {
        enabled: true,
        label: 'Folder Up',
        imgSrc: 'Toolbar/up.svg',
        invert: false
      },
      refresh: {
        enabled: true,
        label: 'Refresh',
        imgSrc: 'Toolbar/refresh.svg',
        invert: false
      },
      delete: {
        enabled: true,
        label: 'Delete',
        imgSrc: 'Toolbar/delete.svg',
        invert: false
      },
      settings: {
        enabled: true,
        label: 'Settings',
        imgSrc: 'Toolbar/settings.svg',
        invert: false
      },
      gitHub: {
        enabled: true,
        label: 'GitHub',
        imgSrc: 'Toolbar/github.svg',
        invert: false
      }
    },
    [DEVICES_TYPE_CONST.mtp]: {
      up: {
        enabled: true,
        label: 'Folder Up',
        imgSrc: 'Toolbar/up.svg',
        invert: false
      },
      refresh: {
        enabled: true,
        label: 'Refresh',
        imgSrc: 'Toolbar/refresh.svg',
        invert: false
      },
      delete: {
        enabled: true,
        label: 'Delete',
        imgSrc: 'Toolbar/delete.svg',
        invert: false
      },
      storage: {
        enabled: true,
        label: 'Storage',
        imgSrc: 'Toolbar/storage.svg',
        invert: false
      },
      settings: {
        enabled: true,
        label: 'Settings',
        imgSrc: 'Toolbar/settings.svg',
        invert: false
      }
    }
  },

  directoryLists: {
    [DEVICES_TYPE_CONST.local]: {
      order: 'asc',
      orderBy: 'name',
      queue: {
        selected: []
      },
      nodes: [],
      isLoaded: false
    },
    [DEVICES_TYPE_CONST.mtp]: {
      order: 'asc',
      orderBy: 'name',
      queue: {
        selected: []
      },
      nodes: [],
      isLoaded: false
    }
  },

  currentBrowsePath: {
    [DEVICES_TYPE_CONST.local]: DEVICES_DEFAULT_PATH.local,
    [DEVICES_TYPE_CONST.mtp]: DEVICES_DEFAULT_PATH.mtp
  },

  mtpDevice: {
    isAvailable: false
  },
  contextMenuList: {
    [DEVICES_TYPE_CONST.local]: {
      rename: {
        enabled: true,
        label: 'Rename',
        data: {}
      },
      copy: {
        enabled: true,
        label: 'Copy',
        data: {}
      },
      copyToQueue: {
        enabled: true,
        label: 'Copy to Queue',
        data: {}
      },
      paste: {
        enabled: true,
        label: 'Paste',
        data: {}
      },
      newFolder: {
        enabled: true,
        label: 'New Folder',
        data: {}
      }
    },
    [DEVICES_TYPE_CONST.mtp]: {
      rename: {
        enabled: true,
        label: 'Rename',
        data: {}
      },
      copy: {
        enabled: true,
        label: 'Copy',
        data: {}
      },
      copyToQueue: {
        enabled: true,
        label: 'Copy to Queue',
        data: {}
      },
      paste: {
        enabled: true,
        label: 'Paste',
        data: {}
      },
      newFolder: {
        enabled: true,
        label: 'New Folder',
        data: {}
      }
    }
  },

  mtpStoragesList: {},

  fileTransfer: {
    clipboard: {
      queue: [],
      source: null
    },
    progress: {
      toggle: false,
      bodyText1: null,
      bodyText2: null,
      percentage: 0
    }
  },

  filesDrag: {
    sourceDeviceType: null,
    destinationDeviceType: null,
    enter: false,
    lock: false,
    sameSourceDestinationLock: false
  }
};

export default function Home(state = initialState, action) {
  const { type, payload, deviceType = null } = action;
  switch (type) {
    case actionTypes.SET_FOCUSSED_FILE_EXPLORER_DEVICE_TYPE:
      return {
        ...state,
        focussedFileExplorerDeviceType: {
          ...state.focussedFileExplorerDeviceType,
          ...payload
        }
      };

    case actionTypes.SET_SORTING_DIR_LISTS:
      return {
        ...state,
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            ...payload
          }
        }
      };

    case actionTypes.SET_SELECTED_DIR_LISTS:
      return {
        ...state,
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            queue: {
              selected: payload.selected
            }
          }
        }
      };

    case actionTypes.SET_CURRENT_BROWSE_PATH:
      return {
        ...state,
        currentBrowsePath: {
          ...state.currentBrowsePath,
          [deviceType]: payload
        }
      };

    case actionTypes.SET_MTP_STATUS:
      return {
        ...state,
        mtpDevice: {
          ...state.mtpDevice,
          isAvailable: payload
        }
      };

    case actionTypes.FETCH_DIR_LIST:
      return {
        ...state,
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            nodes: [...payload.nodes],
            isLoaded: payload.isLoaded
          }
        }
      };

    case actionTypes.CHANGE_MTP_STORAGE:
      return {
        ...state,
        mtpStoragesList: {
          ...initialState.mtpStoragesList,
          ...payload
        }
      };

    case actionTypes.SET_FILE_TRANSFER_CLIPBOARD:
      return {
        ...state,
        fileTransfer: {
          ...state.fileTransfer,
          clipboard: {
            ...payload
          }
        }
      };

    case actionTypes.SET_FILE_TRANSFER_PROGRESS:
      return {
        ...state,
        fileTransfer: {
          ...state.fileTransfer,
          progress: {
            ...payload
          }
        }
      };

    case actionTypes.CLEAR_FILE_TRANSFER:
      return {
        ...state,
        fileTransfer: {
          ...initialState.fileTransfer
        }
      };

    case actionTypes.SET_FILES_DRAG:
      return {
        ...state,
        filesDrag: {
          ...state.filesDrag,
          ...payload
        }
      };

    case actionTypes.CLEAR_FILES_DRAG:
      return {
        ...state,
        filesDrag: {
          ...initialState.filesDrag
        }
      };

    default:
      return state;
  }
}
