export interface OtherConf {
    isDev: boolean;
    styleType: 'sass' | 'scss' | 'less' | 'stylus' | 'css';
    styleResourcePatterns?: string[];
    isCssModules?: boolean;
}
