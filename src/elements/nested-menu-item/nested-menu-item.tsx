import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { useImperativeHandle, useRef, useState, forwardRef } from 'react';
import { styled } from '@mui/material';

const NestedMenuItem = forwardRef((props: any, ref) => {
  const {
    parentMenuOpen,
    label,
    rightIcon = <ArrowRight style={{ fontSize: 16 }} />,
    keepOpen,
    children,
    customTheme,
    className,
    tabIndex: tabIndexProp,
    ContainerProps: ContainerPropsProp = {},
    rightAnchored,
    ...MenuItemProps
  } = props;

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

  const menuItemRef = useRef<any>(null);
  useImperativeHandle(ref, () => menuItemRef?.current);

  const containerRef = useRef<any>(null);
  useImperativeHandle(containerRefProp, () => containerRef.current);

  const menuContainerRef = useRef<any>(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);

  const handleMouseEnter = (event: MouseEvent) => {
    setIsSubMenuOpen(true);

    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    setIsSubMenuOpen(false);

    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event);
    }
  };

  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument?.activeElement;

    for (const child of menuContainerRef.current?.children ?? []) {
      if (child === active) {
        return true;
      }
    }
    return false;
  };

  const handleFocus = (event: FocusEvent) => {
    if (event.target === containerRef.current) {
      setIsSubMenuOpen(true);
    }

    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      return;
    }

    if (isSubmenuFocused()) {
      event.stopPropagation();
    }

    const active = containerRef.current?.ownerDocument?.activeElement;

    if (event.key === 'ArrowLeft' && isSubmenuFocused()) {
      containerRef.current?.focus();
    }

    if (
      event.key === 'ArrowRight' &&
      event.target === containerRef.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0];
      firstChild?.focus();
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <>
      <div
        {...ContainerProps}
        ref={containerRef}
        onFocus={handleFocus}
        tabIndex={tabIndex}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        <MenuItem
          {...MenuItemProps}
          data-open={!!open || undefined}
          className={className}
          ref={menuItemRef}
          keepOpen={keepOpen}
        >
          {label}
          <div style={{ flexGrow: 1 }} />
          {rightIcon}
        </MenuItem>
        <Menu
          sx={{ pointerEvents: 'none', width: '300px', height: '300px' }}
          anchorEl={menuItemRef.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: rightAnchored ? 'left' : 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: rightAnchored ? 'right' : 'left',
          }}
          open={!!open}
          autoFocus={false}
          disableAutoFocus
          disableEnforceFocus
          onClose={() => {
            setIsSubMenuOpen(false);
          }}
        >
          <div ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
            {children}
          </div>
        </Menu>
      </div>
    </>
  );
});
export const DropdownMenuItem = styled(MenuItem)<any>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between !important',
  '& > svg': {
    marginLeft: '32px',
  },
}));

export const DropdownNestedMenuItem = styled(NestedMenuItem)<any>(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between !important',
    '& > svg': {
      marginLeft: '32px',
    },
  })
);
export default NestedMenuItem;
