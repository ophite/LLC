import typesLayout from './types/layout.types';

export const addLayout = (layout) => ({
    type: typesLayout.ADD_LAYOUT,
    payload: { layout }
});

export const deleteLayout = (layout) => ({
    type: typesLayout.DELETE_LAYOUT,
    payload: { layout }
});

export const changeBreakpoint = (breakpoint) => ({
    type: typesLayout.CHANGE_BREAKPOINT,
    payload: { breakpoint }
});

export const saveLayout = (layoutProps) => ({
    type: typesLayout.SAVE_LAYOUT,
    payload: { layoutProps }
});
