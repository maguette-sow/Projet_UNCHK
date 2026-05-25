package com.universite.utilisateur_service;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    ADMIN,
    ADMINISTRATIF,
    ENSEIGNANT,
    ETUDIANT;

    @JsonCreator
    public static Role fromString(String value) {
        if (value == null) return null;
        try {
            // Permet d'accepter "admin", "Admin" ou "ADMIN" sans planter
            return Role.valueOf(value.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            return null; // Évitera le crash 400 automatique
        }
    }
}

