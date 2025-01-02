export const useSliceStr = (_: string, m: number) =>
  _?.length > m ? _.slice(0, m) + '...' : _
