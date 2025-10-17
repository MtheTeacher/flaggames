
import React from 'react';

export const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.224a1.5 1.5 0 0 1-1.052 1.767l-.133.053-1.85 3.33a.5.5 0 0 0 .154.675l1.168.876a1.5 1.5 0 0 1 .845 1.945l-1.07 2.14a.5.5 0 0 0 .316.715l.128.042 2.768.923a1.5 1.5 0 0 1 1.152 1.344l.234 2.342a.5.5 0 0 0 .962.062l.27-2.366a1.5 1.5 0 0 1 1.055-1.285l2.427-1.103a.5.5 0 0 0 .31-.61l-1.02-2.38a1.5 1.5 0 0 1 .737-1.833l1.092-.728a.5.5 0 0 0 .163-.66l-1.78-3.915a1.5 1.5 0 0 1-.86-1.545l.397-2.977A1.5 1.5 0 0 1 19.352 2h1.148A1.5 1.5 0 0 1 22 3.5v17a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 20.5v-17z"/>
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1v1a5 5 0 0 0 1.581 3.581l-1.956 1.957A1 1 0 0 0 6.32 16.32l1.957-1.956A4.981 4.981 0 0 0 12 15a4.981 4.981 0 0 0 3.723-.664l1.957 1.956a1 1 0 0 0 1.414-1.414l-1.956-1.957A5 5 0 0 0 17 9V8h1a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1H8V1a1 1 0 1 0-2 0v1zm-2 4H8V4h8v2z"/>
        <path d="M12 17a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3z"/>
        <path d="M12 22a1 1 0 0 0 1-1v-2a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1z"/>
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd"/>
    </svg>
);

export const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/>
    </svg>
);

export const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);
