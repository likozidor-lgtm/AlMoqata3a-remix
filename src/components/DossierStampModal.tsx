/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DossierData, Language, CharacterStats } from '../types/game';
import { AdministrativeDesk } from './AdministrativeDesk';

interface DossierStampModalProps {
  dossier: DossierData;
  language: Language;
  stats?: CharacterStats;
  currentStageId?: number;
  onApplyStamp: (actionType: 'approve' | 'reject' | 'expedite') => void;
  onClose: () => void;
  onDrinkTea?: () => void;
}

export const DossierStampModal: React.FC<DossierStampModalProps> = ({
  dossier,
  language,
  stats,
  currentStageId,
  onApplyStamp,
  onClose,
  onDrinkTea,
}) => {
  return (
    <AdministrativeDesk
      dossier={dossier}
      language={language}
      stats={stats}
      currentStageId={currentStageId}
      onApplyStamp={onApplyStamp}
      onClose={onClose}
      onDrinkTea={onDrinkTea}
    />
  );
};
