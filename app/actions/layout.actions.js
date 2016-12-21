import typesLayout from './types/layout.types';

export const addLayout = (layout) => ({
    type: typesLayout.ADD_LAYOUT,
    payload: { layout }
});

export const deleteLayout = (layout) => ({
    type: typesLayout.DELETE_LAYOUT,
    payload: { layout }
});

export const saveLayout = (layoutProps) => ({
    type: typesLayout.SAVE_LAYOUT,
    payload: { layoutProps }
});

export const changeLayoutSize = (layoutPropsSize) => ({
    type: typesLayout.CHANGE_LAYOUT_SIZE,
    payload: { layoutPropsSize }
});
