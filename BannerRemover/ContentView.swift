//
//  ContentView.swift
//  BannerRemover
//
//  Created by Spark Zheng on 19/09/22.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Text(" Step 1. Safari->Preferences->Advanced->Show Develop menu in menu bar. \n Step 2. Safari->Develop->Allow Unsigned Extension. \n Step 3. Safari->Preferences->Extensions->Remover.")
            .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
