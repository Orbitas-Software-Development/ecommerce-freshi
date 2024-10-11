using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class newentityFeaturesManagement1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeaturestManagement_Client_ClientId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement",
                newName: "CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_FeaturestManagement_ClientId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement",
                newName: "IX_FeaturestManagement_CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_FeaturestManagement_Company_CompanyId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement",
                column: "CompanyId",
                principalSchema: "dbo",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeaturestManagement_Company_CompanyId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement",
                newName: "ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_FeaturestManagement_CompanyId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement",
                newName: "IX_FeaturestManagement_ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_FeaturestManagement_Client_ClientId",
                schema: "oss-ecommerce",
                table: "FeaturestManagement",
                column: "ClientId",
                principalSchema: "oss-ecommerce",
                principalTable: "Client",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
