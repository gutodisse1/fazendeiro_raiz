import React from 'react';

const EstoqueContext = React.createContext({'value':''});

export const EstoqueProvider = EstoqueContext.Provider;
export const EstoqueConsumer = EstoqueContext.Consumer;

export default EstoqueContext;
