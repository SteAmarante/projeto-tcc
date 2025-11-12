// Quick module declaration to satisfy TypeScript when using `victory-native`.
// This gives minimal (any) types so imports stop erroring during compilation.
// For stronger typing, replace with detailed type definitions or install proper @types packages if available.
declare module 'victory-native' {
  export const VictoryChart: any;
  export const VictoryBar: any;
  export const VictoryTheme: any;
  export const VictoryAxis: any;
  const _default: any;
  export default _default;
}
