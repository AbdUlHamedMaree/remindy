export type NextAppPageParams = Record<string, string | string[] | undefined>;

export type NextAppPage<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TProps extends object = {},
  TParams extends NextAppPageParams = NextAppPageParams,
> = React.FC<
  TProps & {
    params: TParams;
    searchParams: NextAppPageParams;
  }
>;
