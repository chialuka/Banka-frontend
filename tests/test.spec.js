import ReduxThunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { Home, mapStateToProps } from './Home';
import loadUserHomePage from '../../actions/homePage';
import {
  FETCH_USER_HOMEPAGE_BEGIN,
  FETCH_USER_HOMEPAGE_SUCCESS,
  FETCH_USER_HOMEPAGE_ERROR
} from '../../actionTypes';

const setup = propsOverride => {
  const props = {
    user: {},
    loadUserHomePage: jest.fn(),
    ...propsOverride
  };

  const wrapper = shallow(<Home {...props} />);
  return { props, wrapper };
};

describe('Home component test', () => {
  const props = {
    user: {
      firstName: 'Rambo'
    },
    loadUserHomePage: jest.fn()
  };
  const token = 'token';

  localStorage.setItem('userToken', token);

  it('renders the Home component successfully', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
  });

  it('mounts useEffect hook and renders DOM elements', () => {
    let component;
    act(() => {
      component = mount(<Home {...props} />);
    });
    expect(component.find('div')).toHaveLength(1);
    expect(component.find('p')).toHaveLength(1);
    localStorage.clear();
  });

  it('mounts useEffect hook and renders props', () => {
    let component;
    act(() => {
      component = mount(<Home {...props} />);
    });
    expect(component.find('span').text()).toBe('Rambo');
  });
});

describe('Interaction with Redux Store Tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const middleware = [ReduxThunk];
  const mockStore = configureStore(middleware);

  it('dispatches the get user error function on error in getting user', () => {
    const store = mockStore({});
    const expectedState = {};

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 404,
        response: expectedState
      });
    });

    const token = 'token';

    return store.dispatch(loadUserHomePage(token)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toBe(FETCH_USER_HOMEPAGE_ERROR);
    });
  });

  it('dispatches the loadUserHomePage function when it mounts', () => {
    const store = mockStore({});
    const expectedState = {};

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(loadUserHomePage()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe(FETCH_USER_HOMEPAGE_BEGIN);
    });
  });

  it('dispatches the fetch user success action on success', () => {
    const store = mockStore({});
    const expectedState = {
      firstName: 'John',
      lastName: 'Doe'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    const token = 'token';
    const userInfo = 'token@gmail.com';

    return store.dispatch(loadUserHomePage(token, userInfo)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toBe(FETCH_USER_HOMEPAGE_SUCCESS);
    });
  });
});

describe('Test mapStateToProps function', () => {
  const state = {
    userHomePage: {
      loading: false,
      user: {
        firstName: 'Rambo'
      },
      error: null
    }
  };

  it('maps the correct state to props', () => {
    expect(mapStateToProps(state)).toBeDefined();
    expect(mapStateToProps(state).loading).toEqual(false);
    expect(mapStateToProps(state).error).toEqual(null);
    expect(mapStateToProps(state).user.firstName).toEqual('Rambo');
  });
});
