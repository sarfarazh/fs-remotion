// src/types/videoSettings.ts

export interface CompositionSettings {
    subtitle_font: string;
    subtitle_font_size: number;
    subtitle_color: string;
    highlight_color: string;
    watermark: boolean;
    subtitle_position: 'top' | 'bottom';
    subtitle_textAlign: 'left' | 'center' | 'right';
  }
  
  export interface VideoSettings {
    word_composition: CompositionSettings;
    sentence_composition: CompositionSettings;
  }
  