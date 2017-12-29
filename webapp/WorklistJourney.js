sap.ui.define([
	"sap/ui/test/opaQunit"
], function(opaTest) {
	"use strict";

	QUnit.module("Worklist");

	opaTest("Should see the Filter Bar", function(Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		//Actions
		When.onTheWorklistPage.iLookAtTheScreen();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheFilters();
	});

	opaTest("Should see Worklist when Triggering search", function(Given, When, Then) {

		//Actions
		When.onTheWorklistPage.iSeeTheFilterAndSearch();

		// Assertions
		Then.onTheWorklistPage.iSeeTableEntries();
	});

	opaTest("Should see the Creation Dialog for BOM", function(Given, When, Then) {

		//Actions
		When.onTheWorklistPage.iPressOnNewBOMButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeBOMCreationPopup("Create BOM");
	});

	// Create version BOM 
	opaTest("Should see the Creation Dialog for BOM Version", function(Given, When, Then) {

		//Actions
		When.onTheWorklistPage.iPressOnNewVersionBOMButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeBOMCreationPopup("Create Version BOM");
	});

	opaTest("Should see the Creation Dialog for new Alternative", function(Given, When, Then) {

		//Actions
		When.onTheWorklistPage.iSelectItemInTable(3).and.iPressOnNewAlternativeButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeBOMCreationPopup("Create Alternative");

	});

	opaTest("Should see the Creation Dialog for new Version", function(Given, When, Then) {

		//Actions
		When.onTheWorklistPage.iSelectItemInTable(2).and.iPressOnNewVersionButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeBOMCreationPopup("Create Version");

	});

	opaTest("Should see the Handover to Manufacturing popup", function(Given, When, Then) {

		//Actions
		When.onTheWorklistPage.iSelectItemInTable(4).and.iPressOnHandoverButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheCreationPopup("Handover To Manufacturing");

	});

	/* 	opaTest("Should see the entries in the Table", function (Given, When, Then) {
  		
			//Actions
			When.onTheWorklistPage.theTableHasEntries(1);
			
			Then.onTheWorklistPage.iShouldNavigateToObjectPage();

		}); */

	/*	opaTest("Should see the table with all entries", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			//Actions
			When.onTheWorklistPage.iLookAtTheScreen();

			// Assertions
			Then.onTheWorklistPage.iShouldSeeTheTable();
		});
		*/
	/*opaTest("Should see the table with all entries", function (Given, When, Then) {
		

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheTableData();
	});*/

	/*opaTest("Search for the First object should deliver results that contain the firstObject in the name", function (Given, When, Then) {
		//Actions
		When.onTheWorklistPage.iSearchForTheFirstObject();

		// Assertions
		Then.onTheWorklistPage.theTableShowsOnlyObjectsWithTheSearchStringInTheirTitle();
	});


	opaTest("Entering something that cannot be found into search field and pressing search field's refresh should leave the list as it was", function (Given, When, Then) {
		//Actions
		When.onTheWorklistPage.iTypeSomethingInTheSearchThatCannotBeFound().
			and.iTriggerRefresh();

		// Assertions
		Then.onTheWorklistPage.theTableHasEntries();
	});

	opaTest("Should open the share menu and display the share buttons", function (Given, When, Then) {
		// Actions
		When.onTheWorklistPage.iPressOnTheShareButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheShareEmailButton().
			and.iTeardownMyAppFrame();
	});

	opaTest("Should see the busy indicator on app view while worklist view metadata is loaded", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			delay: 5000
		});

		//Actions
		When.onTheWorklistPage.iLookAtTheScreen();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheBusyIndicatorForTheWholeApp();
	});

	opaTest("Should see the busy indicator on worklist table after metadata is loaded", function (Given, When, Then) {
		//Actions
		When.onTheAppPage.iWaitUntilTheAppBusyIndicatorIsGone();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheWorklistTableBusyIndicator().
			and.iTeardownMyAppFrame();
	});*/

});