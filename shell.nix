{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell { ## Shell for VsCode
  buildInputs = with pkgs; [
    biome
  ];

  shellHook = ''
  '';
}
