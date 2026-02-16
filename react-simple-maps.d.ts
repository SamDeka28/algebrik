declare module 'react-simple-maps' {
  import { ComponentType, ReactNode } from 'react';

  export interface ComposableMapProps {
    projection?: string | ((width: number, height: number) => any);
    projectionConfig?: Record<string, any>;
    width?: number;
    height?: number;
    viewBox?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography?: string | object;
    children?: (data: {
      geographies: Array<{
        rsmKey: string;
        properties: Record<string, any>;
        [key: string]: any;
      }>;
    }) => ReactNode;
  }

  export interface GeographyStyle {
    default?: React.CSSProperties;
    hover?: React.CSSProperties;
    pressed?: React.CSSProperties;
  }

  export interface GeographyProps {
    geography?: {
      rsmKey: string;
      properties: Record<string, any>;
      [key: string]: any;
    };
    style?: React.CSSProperties | GeographyStyle | ((props: any) => React.CSSProperties | GeographyStyle);
    className?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeDasharray?: string;
    onClick?: (event: React.MouseEvent, geography: any) => void;
    onMouseEnter?: (event: React.MouseEvent, geography: any) => void;
    onMouseLeave?: (event: React.MouseEvent, geography: any) => void;
    onMouseMove?: (event: React.MouseEvent, geography: any) => void;
    children?: ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
}
