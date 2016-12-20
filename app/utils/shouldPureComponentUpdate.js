import shallowEqual from '../components/pages/reactVirtualized/demo/shallowEqual';

export default function shouldPureComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) ||
         !shallowEqual(this.state, nextState);
}