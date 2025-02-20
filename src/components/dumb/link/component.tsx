'use client';

import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { clsx } from 'clsx';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, memo } from 'react';

const Anchor = styled('a')({});

export type NextLinkComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  Omit<
    NextLinkProps,
    'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'
  > & {
    to: NextLinkProps['href'];
    linkAs?: NextLinkProps['as'];
  };

export const NextLinkComposed = memo(
  forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
    function NextLinkComposed(props, ref) {
      const {
        to,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior = true,
        locale,
        ...other
      } = props;

      return (
        <NextLink
          href={to}
          prefetch={prefetch}
          as={linkAs}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          passHref
          locale={locale}
          legacyBehavior={legacyBehavior}
        >
          <Anchor ref={ref} {...other} />
        </NextLink>
      );
    }
  )
);

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

export const Link = memo(
  forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
    const {
      activeClassName = 'active',
      as,
      className: classNameProps,
      href,
      legacyBehavior,
      linkAs: linkAsProp,
      locale,
      noLinkStyle,
      prefetch,
      replace,
      role, // Link don't have roles.
      scroll,
      shallow,
      ...other
    } = props;

    const pagePathname = usePathname();

    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
      [activeClassName]: pagePathname === pathname && activeClassName,
    });

    const linkAs = linkAsProp || as;
    const nextjsProps = {
      to: href,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      legacyBehavior,
      locale,
    };

    if (noLinkStyle) {
      return (
        <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />
      );
    }

    return (
      <MuiLink
        component={NextLinkComposed}
        className={className}
        ref={ref}
        {...nextjsProps}
        {...other}
      />
    );
  })
);
